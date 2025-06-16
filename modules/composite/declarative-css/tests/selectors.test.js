import { it, expect } from 'bun:test'
import { handleSelectors } from '../handlers/selector'

// ----- handleGroupIdentifierSelector ---------------

it('should transform a `group *` selector',
  () =>
  {
    expect(handleSelectors(['group \'foo\''])).toEqual(['&.foo']);
    expect(handleSelectors(['group "foo"'])).toEqual(['&.foo']);
  }
);

// ----- handleUniqueIdentifierSelector ---------------

it('should transform a `unique *` selector',
  () =>
  {
    expect(handleSelectors(['unique \'foo\''])).toEqual(['&#foo']);
    expect(handleSelectors(['unique "foo"'])).toEqual(['&#foo']);
  }
);

// ----- handleAttributeSelector ---------------

it('should transform an `attribute *` selector',
  () =>
  {
    expect(handleSelectors(['attribute foo'])).toEqual(['&[foo]']);
    expect(handleSelectors(['attribute \'foo\''])).toEqual(['&[foo]']);
    expect(handleSelectors(['attribute "foo"'])).toEqual(['&[foo]']);
  }
);

// ----- handleAttributeIsMissingSelector ---------------

it('should transform an `attribute * is missing` selector',
  () =>
  {
    expect(handleSelectors(['attribute foo is missing'])).toEqual(['&:not([foo])']);
    expect(handleSelectors(['attribute \'foo\' is missing'])).toEqual(['&:not([foo])']);
    expect(handleSelectors(['attribute "foo" is missing'])).toEqual(['&:not([foo])']);
  }
);

// ----- handleAttributeIsValueSelector ---------------

it('should transform an `attribute * is **` selector',
  () =>
  {
    expect(handleSelectors(['attribute foo is "bar"'])).toEqual(['&[foo=bar]']);
    expect(handleSelectors(['attribute foo is \'bar\''])).toEqual(['&[foo=bar]']);
    expect(handleSelectors(['attribute \'foo\' is "bar"'])).toEqual(['&[foo=bar]']);
    expect(handleSelectors(['attribute "foo" is "bar"'])).toEqual(['&[foo=bar]']);
    expect(handleSelectors(['attribute foo is "foo bar"'])).toEqual(['&[foo="foo bar"]']);
  }
);

// ----- handleAttributeIsNotValueSelector ---------------

it('should transform an `attribute * is not **` selector',
  () =>
  {
    expect(handleSelectors(['attribute foo is not "bar"'])).toEqual(['&:not([foo=bar])']);
    expect(handleSelectors(['attribute foo is not \'bar\''])).toEqual(['&:not([foo=bar])']);
    expect(handleSelectors(['attribute \'foo\' is not "bar"'])).toEqual(['&:not([foo=bar])']);
    expect(handleSelectors(['attribute "foo" is not "bar"'])).toEqual(['&:not([foo=bar])']);
    expect(handleSelectors(['attribute foo is not "foo bar"'])).toEqual(['&:not([foo="foo bar"])']);
  }
);

// ----- handleChildElementRelationshipSelector ---------------

it('should transform a `child *` selector',
  () =>
  {
    expect(handleSelectors(['child span'])).toEqual(['&>span']);
  }
);

// ----- handleChildGroupRelationshipSelector ---------------

it('should transform a `child group **` selector',
  () =>
  {
    expect(handleSelectors(['child group \'foo\''])).toEqual(['&>.foo']);
    expect(handleSelectors(['child group \'foo-bar\''])).toEqual(['&>.foo-bar']);
    expect(handleSelectors(['child group \'foo bar\''])).toEqual(['&>.foo-bar']);
  }
);

// ----- handleSiblingElementRelationshipSelector ---------------

it('should transform a `sibling *` selector',
  () =>
  {
    expect(handleSelectors(['sibling span'])).toEqual(['&~span']);
  }
);

// ----- handleSiblingGroupRelationshipSelector ---------------

it('should transform a `sibling group **` selector',
  () =>
  {
    expect(handleSelectors(['sibling group \'foo\''])).toEqual(['&~.foo']);
    expect(handleSelectors(['sibling group \'foo-bar\''])).toEqual(['&~.foo-bar']);
    expect(handleSelectors(['sibling group \'foo bar\''])).toEqual(['&~.foo-bar']);
  }
);

// ----- handleAdjacentElementRelationshipSelector ---------------

it('should transform a `adjacent *` selector',
  () =>
  {
    expect(handleSelectors(['adjacent span'])).toEqual(['&+span']);
  }
);

// ----- handleAdjacentGroupRelationshipSelector ---------------

it('should transform a `adjacent group **` selector',
  () =>
  {
    expect(handleSelectors(['adjacent group \'foo\''])).toEqual(['&+.foo']);
    expect(handleSelectors(['adjacent group "foo"'])).toEqual(['&+.foo']);
    expect(handleSelectors(['adjacent group "foo-bar"'])).toEqual(['&+.foo-bar']);
    expect(handleSelectors(['adjacent group "foo bar"'])).toEqual(['&+.foo-bar']);
  }
);

// ----- handleDescendantElementRelationshipSelector ---------------

it('should transform a `descendant *` selector',
  () =>
  {
    expect(handleSelectors(['descendant span'])).toEqual(['& span']);
  }
);

// ----- handleDescendantGroupRelationshipSelector ---------------

it('should transform a `descendant group **` selector',
  () =>
  {
    expect(handleSelectors(['descendant group \'foo\''])).toEqual(['& .foo']);
    expect(handleSelectors(['descendant group "foo"'])).toEqual(['& .foo']);
    expect(handleSelectors(['descendant group "foo-bar"'])).toEqual(['& .foo-bar']);
    expect(handleSelectors(['descendant group "foo bar"'])).toEqual(['& .foo-bar']);
  }
);

// ----- handleStateSelector ---------------

it('should transform a `state is **` selector',
  () =>
  {
    expect(handleSelectors(['state is \'foo\''])).toEqual(['&.foo']);
    expect(handleSelectors(['state is "foo"'])).toEqual(['&.foo']);
    expect(handleSelectors(['state is "foo-bar"'])).toEqual(['&.foo-bar']);
    expect(handleSelectors(['state is "foo bar"'])).toEqual(['&.foo-bar']);
  }
);

// ----- handleNegatedStateSelector ---------------

it('should transform a `state is not **` selector',
  () =>
  {
    expect(handleSelectors(['state is not \'foo\''])).toEqual(['&:not(.foo)']);
    expect(handleSelectors(['state is not "foo"'])).toEqual(['&:not(.foo)']);
    expect(handleSelectors(['state is not "foo-bar"'])).toEqual(['&:not(.foo-bar)']);
    expect(handleSelectors(['state is not "foo bar"'])).toEqual(['&:not(.foo-bar)']);
  }
);