import {Page} from './types';
import {useMatch} from '@tanstack/react-router';
import {useState, useEffect, useRef} from 'react';
import {supabase} from './SupabaseClient';
import startPageScaffold from './startPageData.json';
import styles from './common.module.css';
import Loader from '../components/Loader';

type InjectedProps = {
  initialState: Page;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & InjectedProps>
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const match = useMatch({from: '/$slug', shouldThrow: false});
    const pageSlug = match ? match.params.slug : 'start';

    const [initialState, setInitialState] = useState<Page | null>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();
    // const inProgress = useRef(false);

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const {data: userData} = await supabase.auth.getUser();
          const user = userData.user;
          if (!user) {
            throw new Error('کاربر وارد نشده است');
          }
          const {data} = await supabase
            .from('pages')
            .select('title, id, cover, nodes, slug')
            .match({slug: pageSlug, created_by: user.id})
            .single();

          if (!data && pageSlug === 'start') {
            const result = await supabase
              .from('pages')
              .insert({
                ...startPageScaffold,
                slug: 'start',
                created_by: user.id,
              })
              .single();

            setInitialState(result?.data);
          } else {
            setInitialState(data);
          }
        } catch (e) {
          if (e instanceof Error) {
            setError(e);
          }
        }

        setIsLoading(false);
      };
      fetchInitialState();
    }, [pageSlug]);

    if (isLoading) {
      return (
        <div className={styles.centeredFlex}>
          <Loader />
        </div>
      );
    }

    if (error) {
      return <div>{error.message} </div>;
    }

    if (!initialState) {
      return <div className={styles.centeredFlex}>صفحه ای پیدا نشد</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
