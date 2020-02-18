import { IStyleAPI, IStyleItem } from 'import-sort-style';

export default function(styleApi: IStyleAPI): IStyleItem[] {
  const {
    and,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    name,
    naturally,
    not,
    startsWith,
    unicode,
  } = styleApi;

  const isLocalPackageModule = moduleName(startsWith('~'));

  return [
    // import "foo"
    {
      match: and(hasNoMember, isAbsoluteModule, not(isLocalPackageModule)),
      sort: moduleName(naturally),
    },

    // import "~/foo"
    {
      match: and(hasNoMember, isAbsoluteModule, isLocalPackageModule),
      sort: moduleName(naturally),
    },

    // import "./foo"
    {
      match: and(hasNoMember, isRelativeModule),
      sort: moduleName(naturally),
    },

    // ---
    { separator: true },

    // import _ from "foo"
    {
      match: and(isAbsoluteModule, not(isLocalPackageModule)),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },

    // ---
    { separator: true },

    // import _ from "~/foo"
    {
      match: and(isAbsoluteModule, isLocalPackageModule),
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },

    // ---
    { separator: true },

    // import _ from "./foo"
    {
      match: isRelativeModule,
      sort: moduleName(naturally),
      sortNamedMembers: name(unicode),
    },
  ];
}
