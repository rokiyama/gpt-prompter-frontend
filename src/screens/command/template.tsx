const regexp = /\{\{([a-zA-Z]+?)\}\}/g;

export const render = (template: string, variables: Record<string, string>) =>
  [...template.matchAll(regexp)].reduce(
    (accm, [placeholder, varName]) =>
      accm.replace(placeholder, variables[varName] || placeholder),
    template
  );
