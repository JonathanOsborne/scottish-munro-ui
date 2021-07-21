import React from 'react';
import Image from 'next/image';
import { Header, Segment, Grid, Button } from 'semantic-ui-react';

export interface Munro {
  altitude?: number;
  climbers?: number;
  description?: string;
  id?: string;
  link?: string;
  name?: string;
  rating?: number;
  region?: string;
  routes?: string[];
}

export interface Pagination {
  total?: number;
  page?: number;
  per_page?: number;
  prev?: number;
  next?: number;
  total_pages?: number;
}

export interface MunrosData {
  data: Munro[];
  pagination: Pagination;
}

const externaImageLoader = ({ src }: { src: string }) =>
  `https://d3teiib5p3f439.cloudfront.net/${src}`;

export const MunroCard = (props: Munro) => {
  const {
    description,
    name,
    altitude,
    climbers,
    rating,
    region,
    id,
    routes,
    link,
  } = props;

  return (
    <>
      <Segment clearing attached color="teal" inverted>
        <Grid columns={2} verticalAlign="middle" centered>
          <Grid.Column>
            <Header as="h2" floated="left">
              <a href={link} target="_blank" rel="noreferrer">
                {name}
              </a>
            </Header>
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" floated="right">
              {region}
            </Header>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached raised clearing>
        <Grid columns={2} verticalAlign="middle" centered>
          <Grid.Column textAlign="justified">
            <p>{description}</p>
            <Header as="h3" content="Route:" />
            {routes && (
              <Button color="teal">
                <a href={routes[0]} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </Button>
            )}
          </Grid.Column>
          <Grid.Column>
            <Image
              src={`/munros/${id}-1.JPG`}
              alt="Perth"
              loader={externaImageLoader}
              width={350}
              height={300}
            />
          </Grid.Column>
        </Grid>
        <Segment.Group horizontal>
          <Segment color="teal" textAlign="center">
            <b>Altitude</b>: {altitude}m
          </Segment>
          <Segment color="teal" textAlign="center">
            <b>Number of Climbers</b>: {climbers}
          </Segment>
          <Segment color="teal" textAlign="center">
            <b>Rating</b>: {rating}
          </Segment>
        </Segment.Group>
      </Segment>
    </>
  );
};
