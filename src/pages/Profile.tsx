import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { User, Mail, Calendar, FileText, Save, LogOut } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/store/useStore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export function Profile() {
  const navigate = useNavigate();
  const { user, firebaseUser, logout, loading: authLoading } = useAuth();
  const { addToast } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);

  // Redirect if not logged in
  if (!authLoading && !user) {
    navigate('/');
    return null;
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-terracotta-500 border-t-transparent" />
      </div>
    );
  }

  const handleSave = async () => {
    if (!firebaseUser || !displayName.trim()) return;

    setSaving(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(firebaseUser, { displayName: displayName.trim() });

      // Update Firestore document
      const userRef = doc(db, 'users', user.id);
      await updateDoc(userRef, { displayName: displayName.trim() });

      addToast('success', 'Perfil atualizado com sucesso');
      setIsEditing(false);

      // Force page reload to update context
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      addToast('error', 'Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      addToast('success', 'Sessão terminada');
      navigate('/');
    } catch {
      addToast('error', 'Erro ao terminar sessão');
    }
  };

  const formatDate = (timestamp: { toDate: () => Date } | Date) => {
    const date = 'toDate' in timestamp ? timestamp.toDate() : timestamp;
    return new Intl.DateTimeFormat('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-[80vh] py-8 sm:py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-display text-display-xs sm:text-display-sm text-ink-900 mb-2">
              O Meu Perfil
            </h1>
            <p className="text-ink-500 text-sm sm:text-base">
              Gerir as suas informações de conta
            </p>
          </div>

          {/* Profile Card */}
          <Card className="p-5 sm:p-8 mb-6">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-sand-200">
              <div className={clsx(
                'w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center',
                'bg-terracotta-100 text-terracotta-600',
                'ring-4 ring-cream-100'
              )}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="font-display font-bold text-2xl sm:text-3xl">
                    {user.displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900">
                  {user.displayName}
                </h2>
                <p className="text-ink-500 text-sm sm:text-base">{user.email}</p>
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-5 sm:space-y-6">
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  <User className="w-4 h-4 inline-block mr-2" />
                  Nome de Exibição
                </label>
                {isEditing ? (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Input
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="O seu nome"
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        isLoading={saving}
                        leftIcon={<Save className="w-4 h-4" />}
                        className="flex-1 sm:flex-none"
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsEditing(false);
                          setDisplayName(user.displayName);
                        }}
                        className="flex-1 sm:flex-none"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-ink-800">{user.displayName}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Editar
                    </Button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  <Mail className="w-4 h-4 inline-block mr-2" />
                  Email
                </label>
                <span className="text-ink-800 text-sm sm:text-base">{user.email}</span>
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  <Calendar className="w-4 h-4 inline-block mr-2" />
                  Membro desde
                </label>
                <span className="text-ink-800 text-sm sm:text-base">
                  {user.createdAt ? formatDate(user.createdAt) : 'Data não disponível'}
                </span>
              </div>

              {/* Reviews Count */}
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  <FileText className="w-4 h-4 inline-block mr-2" />
                  Avaliações publicadas
                </label>
                <span className="text-ink-800">{user.reviewsCount || 0}</span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/minhas-avaliacoes')}
              leftIcon={<FileText className="w-4 h-4" />}
              className="flex-1"
            >
              Ver as minhas avaliações
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-4 h-4" />}
              className="text-status-avoid hover:bg-status-avoid/5"
            >
              Terminar sessão
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
