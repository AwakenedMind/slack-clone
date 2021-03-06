const { gql } = require('apollo-server-express');

export default gql`
	type Channel {
		id: Int!
		name: String!
		messages: [Message!]!
		public: Boolean!
		users: [User!]!
	}

	type Mutation {
		createChannel(
			teamId: Int!
			name: String!
			public: Boolean = false
		): Boolean!
	}
`;
