import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Munro, MunroCard } from '@/components/Munro';
import { StandardHeader } from '@/components/Header';
import { Container, Button } from 'semantic-ui-react';
import { wrapper, AppState } from '@/store/store';

import styles from '@/styles/Home.module.css';
import { setMunro } from '@/store/munroSlice';
import { MenuBar, MunroAPIPageType } from '@/components/MenuBar';

interface MunroResponse {
  munro: Munro;
  index: number;
  prev: string;
  next: string;
  random: string;
}

const MunroPage = ({ munro, prev, next, random }: MunroResponse) => {
  const { name } = munro;

  return (
    <>
      <MenuBar page={MunroAPIPageType.MUNRO_CONTENT} randomMunro={random} />
      <Head>
        <title>{name}</title>
        <meta name="description" content={name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StandardHeader title="Munro Explorer" />
      <Container>
        <MunroCard {...munro} />
      </Container>
      <footer className={styles.footer}>
        <Link href={`/munros/${prev}`} passHref>
          <Button content="Previous" icon="left arrow" labelPosition="left" />
        </Link>
        <Link href={`/munros/${next}`} passHref>
          <Button content="Next" icon="right arrow" labelPosition="right" />
        </Link>
      </footer>
    </>
  );
};

export default MunroPage;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store: AppState) => async ({ params }) => {
    const id = params ? params.id : ``;

    const url = `http://localhost:3000/api/munro/${id}`;
    const res = await fetch(url);
    const resp: MunroResponse = await res.json();
    store.dispatch(setMunro(resp.munro));
    return {
      props: {
        munro: resp.munro,
        index: resp.index,
        prev: resp.prev,
        next: resp.next,
        id,
        random: resp.random,
      },
    };
  });
