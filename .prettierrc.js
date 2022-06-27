module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	trailingComma: "all",
	overrides: [
		{
			files: "*.json",
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
};
