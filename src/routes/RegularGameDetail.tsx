import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getRegularGame } from '../api';

export default function RegularGameDetail() {
  const { regularGamePk } = useParams();
  const { isLoading, data } = useQuery(['regularGame', regularGamePk], getRegularGame);
  return <span>regular game {regularGamePk} detail</span>;
}
