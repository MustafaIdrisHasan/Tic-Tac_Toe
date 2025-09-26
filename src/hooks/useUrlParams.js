import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { isValidGameMode } from '../utils/gameLogic/gameFactory';
import { OPPONENT_TYPES, AI_DIFFICULTIES } from '../utils/constants';

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => {
    const mode = searchParams.get('mode');
    const opponent = searchParams.get('opponent');
    const difficulty = searchParams.get('difficulty');

    return {
      mode: isValidGameMode(mode) ? mode : null,
      opponent: Object.values(OPPONENT_TYPES).includes(opponent) ? opponent : OPPONENT_TYPES.TEST,
      difficulty: Object.values(AI_DIFFICULTIES).includes(difficulty) ? difficulty : AI_DIFFICULTIES.MEDIUM
    };
  }, [searchParams]);

  const updateParams = (newParams) => {
    const updatedParams = new URLSearchParams(searchParams);
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value);
      }
    });

    setSearchParams(updatedParams);
  };

  const clearParams = () => {
    setSearchParams({});
  };

  return {
    ...params,
    updateParams,
    clearParams,
    searchParams
  };
};
