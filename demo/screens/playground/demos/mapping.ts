import mapper from '@cookbook/mapper-js';

const mapping = mapper((map) => ({
  active: map<boolean>('isActive').value,
  'account.balance': map<string>('balance').value,
  'person.age': map<string>('age').value,
  'person.address': map('address').value,
  commonFriends: map('commonFriends').value,
}));

export default mapping;
