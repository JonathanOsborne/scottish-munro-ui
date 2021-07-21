import Head from 'next/head';
import { MenuBar, MunroAPIPageType } from '@/components/MenuBar';
import { MunroCard } from '@/components/Munro';
import { StandardHeader } from '@/components/Header';
import { QueryPanel } from '@/components//QueryPanel';
import { Container, Segment, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { queryMunrosSelector } from '@/store/munroSlice';
import React from 'react';

const MunroSearch = () => {
  const queryResult = useSelector(queryMunrosSelector);

  return (
    <>
      <Head>
        <title>Munro Search</title>
        <meta name="description" content="Scottish Munros Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar page={MunroAPIPageType.MUNRO_SEARCH} />
      <StandardHeader title="Munro Search" />
      <Container>
        <QueryPanel />
        {queryResult && queryResult.length > 0 && (
          <Segment color="teal">
            <Grid columns={1} centered>
              {queryResult.map((i) => (
                <Grid.Column key={i.id} textAlign="justified">
                  <MunroCard key={i.id} {...i} />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>
        )}
      </Container>
    </>
  );
};

export default MunroSearch;
