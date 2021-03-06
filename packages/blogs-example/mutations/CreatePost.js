import assert from 'assert';

export default types => ({
  name: 'CreatePost',
  inputFields: {
    title: types.String,
    text: types.String,
  },
  outputFields: {
    user: types.User,
  },
  mutateAndGetPayload: async (input, context) => {
    const {title, text} = input;
    const {db, session} = context;
    const {currentUserID} = session;

    assert(title.length > 0, 'Posts must have titles');
    assert(text.length > 0, 'Posts must have text');

    const user = await db.findBy('users', {id: currentUserID});

    const post = await db.insert('posts', {
      createdAt: new Date(),
      authoredByUserID: currentUserID,
      title,
      text,
    });

    return {user};
  },
});
