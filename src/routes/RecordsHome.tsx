import { useQuery } from '@tanstack/react-query';
import { getRegularGameScore } from '../api';
import { IRegularGameScore } from '../types';
import { useParams } from 'react-router-dom';

export default function RecordsHome() {
  const { datePk } = useParams();
  const { isLoading, data } = useQuery<IRegularGameScore[]>(['regularGame', datePk], getRegularGameScore);
  return (
    <div>
      <h1>Records Home</h1>
    </div>
  );
}
