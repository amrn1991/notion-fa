import {useState, FormEvent} from 'react';
import {Navigate} from '@tanstack/react-router';
import {supabase} from '../../utils/SupabaseClient';
import {useAuthSession} from '../../utils/AuthContext';
import styles from '../../utils/common.module.css';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const {session} = useAuthSession();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const {error} = await supabase.auth.signInWithOtp({email});
      if (error) throw error;
      alert('ایمیل خود را چک کنید!');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>یادداشت</h1>
        <p>با ایمیل خود وارد شوید</p>
        {loading ? (
          'در حال ارسال لینک شخصی'
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">ایمیل: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ایمیل خود را وارد کنید"
            />
            <button>ارسال لینک</button>
          </form>
        )}
      </div>
    </div>
  );
}
