import { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, ShieldCheck, X } from 'lucide-react';
import { userApi } from '../lib/api';
import { isAdmin, isAllowlistedAdmin, primaryEmail } from '../lib/auth';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const userIsAdmin = isAdmin(user);
  const locked = isAllowlistedAdmin(primaryEmail(user));

  const { mutate: setRole, isPending, error } = useMutation({
    mutationFn: userApi.setRole,
    onSuccess: async () => {
      // publicMetadata is cached in the session — reload or the role stays stale.
      await user?.reload();
      queryClient.invalidateQueries();
    },
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const errorMessage =
    error && typeof error === 'object' && 'response' in error
      ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
      : null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      onClick={onClose}
    >
      <div
        className='w-full max-w-md rounded-2xl border border-(--border-color) bg-(--bg-card) shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-(--border-color) px-5 py-4'>
          <h2 className='text-base font-semibold text-(--text-main)'>Settings</h2>
          <button
            onClick={onClose}
            className='rounded-lg p-1.5 text-(--text-muted) transition-colors hover:bg-(--bg-hover) hover:text-(--text-main)'
            aria-label='Close settings'
          >
            <X size={18} />
          </button>
        </div>

        <div className='px-5 py-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex gap-3'>
              <ShieldCheck className='mt-0.5 h-5 w-5 shrink-0 text-(--color-primary)' />
              <div>
                <p className='text-sm font-medium text-(--text-main)'>Admin mode</p>
                <p className='mt-1 text-xs text-(--text-muted)'>
                  Turn this on to unlock the admin dashboard — products, orders and
                  customers. This is a portfolio demo, so anyone can grant themselves
                  access.
                </p>
              </div>
            </div>

            <button
              role='switch'
              aria-checked={userIsAdmin}
              aria-label='Toggle admin mode'
              disabled={isPending || locked}
              onClick={() => setRole(userIsAdmin ? 'user' : 'admin')}
              className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                userIsAdmin ? 'bg-(--color-primary)' : 'bg-(--border-color)'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform ${
                  userIsAdmin ? 'translate-x-5' : 'translate-x-0'
                }`}
              >
                {isPending && <Loader2 className='h-3 w-3 animate-spin text-gray-600' />}
              </span>
            </button>
          </div>

          {locked && (
            <p className='mt-4 rounded-lg bg-(--bg-hover) px-3 py-2 text-xs text-(--text-muted)'>
              This account is a permanent admin (listed in the admin email
              allowlist), so admin mode can't be turned off here.
            </p>
          )}

          {errorMessage && (
            <p className='mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-500'>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
