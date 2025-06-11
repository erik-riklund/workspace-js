import { makeMutableBlock } from '.'

declare global
{
  namespace CssEngine
  {
    type MutableBlock = ReturnType<typeof makeMutableBlock>;

    type Plugin =
      | { stage: 'input', handler: (input: string) => string }
      | { stage: 'transform', handler: (block: MutableBlock) => void }
      | { stage: 'output', handler: (result: string, tree: AbstractTree) => string };

    type TransformPlugin = FilterByStage<Plugin, 'transform'>;
    type RawPropertyHandler = (property: RawProperty) => void;
  }
}

type FilterByStage<T, S> = T extends { stage: S } ? T : never;