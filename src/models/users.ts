import users from '../fakedata/users';

export class User {

  id: number;
  name: string;
  email: string;

  relationshipId: number;

  static findById(id: number): User | undefined {
    return users.find(({ id: userId }) => id === userId);
  }

  static getPartner(id: number): User | undefined {
    const user = this.findById(id);

    if (!user) throw new Error('user-not-exist');

    return users.find(({ relationshipId, id: userId }) => relationshipId === user.relationshipId && id !== userId )
  }
}