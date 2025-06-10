import { makeMutableBlock } from '.'

declare global
{
  type CssEngineMutableBlock = ReturnType<typeof makeMutableBlock>;

  type CssEnginePlugin =
    | { stage: 'input', handler: (input: string) => string }
    | { stage: 'transform', handler: (block: CssEngineMutableBlock) => void }
    | { stage: 'output', handler: (result: string, tree: CssParserAbstractTree) => string };

  type CssEngineTransformPlugin = FilterByStage<CssEnginePlugin, 'transform'>;
}

type FilterByStage<T, S> = T extends { stage: S } ? T : never;