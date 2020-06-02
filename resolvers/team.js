import { formatErrors } from '../utils/FormatErrors';

// Will pass JWT to the user
export default {
	Mutation: {
		createTeam: async (parent, args, { models, user }) => {
			try {
				await models.Team.create({ ...args, owner: user.id });
				return {
					ok: true,
				};
			} catch (err) {
				console.log(err);
				return {
					ok: false,
					errors: formatErrors(err),
				};
			}
		},
	},
	Query: {
		allTeams: (parent, args, { models, user }) => models.User.findAll(),
	},
};
