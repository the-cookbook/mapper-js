import mapper from './';

describe('mapper', () => {
  it('should match snapshot', () => {
    expect(mapper).toMatchSnapshot();
  });
});
