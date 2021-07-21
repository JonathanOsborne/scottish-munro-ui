import Head from 'next/head';
import React, { useEffect } from 'react';
import { StandardHeader } from '@/components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { randomMunroSelector, fetchRandomMunro } from '@/store/munroSlice';
import { MenuBar, MunroAPIPageType } from '@/components/MenuBar';

export default function Home() {
  const randomMunro = useSelector(randomMunroSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!randomMunro) {
      dispatch(fetchRandomMunro());
    }
  }, [dispatch, randomMunro]);

  return (
    <div>
      <Head>
        <title>Scottish Munros</title>
        <meta name="description" content="Scottish Munros Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar page={MunroAPIPageType.HOME} />
      <StandardHeader title="Welcome to Munros API" />
    </div>
  );
}
