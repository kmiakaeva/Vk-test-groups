import groupsData from '../data/groups.json';
import { GetGroupsResponse, Group as GroupType } from './types';

export const groupsApi = (): Promise<GetGroupsResponse> => {
  return new Promise((resolve, reject) => {
    const result: GetGroupsResponse = {
      result: 1,
      data: groupsData.map((group: GroupType) => ({
        ...group,
      })),
    };

    setTimeout(() => {
      if (result.result !== 0 && result.data) {
        resolve(result);
      } else {
        reject(new Error('Не удалось получить данные'));
      }
    }, 1010);
  });
};
