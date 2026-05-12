/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Требования',
      items: [
        'requirements/functional',
        'requirements/nonfunctional',
        'requirements/use-case-diagram',
      ],
    },
    {
      type: 'category',
      label: 'Модель данных',
      items: [
        'data-model/erd-diagram',
        'data-model/entities',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: ['api/api-reference'],
    },
  ],
};

export default sidebars;