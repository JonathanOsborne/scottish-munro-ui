import { Form, Segment } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchQueryMunros,
  setQuerySortField,
  QuerySortFieldEnum,
  queryParamsSelector,
  setQuerySortDirection,
  QuerySortDirectionEnum,
  setQueryName,
} from '@/store/munroSlice';

export const QueryPanel = () => {
  const dispatch = useDispatch();
  const queryParams = useSelector(queryParamsSelector);

  const sortOptions = [
    { key: `r`, text: `Rating`, value: `rating` },
    { key: `a`, text: `Altitude`, value: `altitude` },
    { key: `al`, text: `Name`, value: `name` },
  ];

  const sortDirectionOptions = [
    { key: `a`, text: `Ascending`, value: `asc` },
    { key: `d`, text: `Descending`, value: `desc` },
  ];

  return (
    <Segment color="teal" inverted padded raised>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Munro Name..."
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              { value },
            ) => {
              dispatch(setQueryName(value));
            }}
          />
          <Form.Select
            label="Sort By"
            placeholder="Sort By"
            options={sortOptions}
            value={queryParams.querySortField}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              { value },
            ) => {
              dispatch(setQuerySortField(value as QuerySortFieldEnum));
            }}
          />
          <Form.Select
            label="Sort Direction"
            placeholder="Sort By"
            options={sortDirectionOptions}
            value={queryParams.querySortDirection}
            onChange={(
              event: React.SyntheticEvent<Element, Event>,
              { value },
            ) => {
              dispatch(setQuerySortDirection(value as QuerySortDirectionEnum));
            }}
          />
        </Form.Group>
        <Form.Button onClick={() => dispatch(fetchQueryMunros())}>
          Submit
        </Form.Button>
      </Form>
    </Segment>
  );
};
