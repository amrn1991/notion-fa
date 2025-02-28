import { supabase } from './SupabaseClient';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { create } from 'zustand';

interface AuthStore {
  session: Session | null
  loading: boolean
  auth: () => void
  subscribe: (event: AuthChangeEvent, session: Session | null) => void
}

export const useAuthStore = create<AuthStore>()((set) => ({
  session: null,
  loading: true,
  auth: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data.session) {
      set({ loading: false, session: data.session })
    } else {
      console.log(error)
    }
  },
  subscribe: (_event, session) => {
    set({ session, loading: false })
  }
}));

export default useAuthStore;