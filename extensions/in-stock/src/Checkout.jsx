import {
  useApi,
  useTranslate,
  Grid,
  reactExtension,
  BlockLayout,
  Image,
  Text,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const {text} = useSettings();

  return (
    <BlockLayout
      rows={['fill']}
      border={'base'}
      borderRadius={'base'}
      spacing={'loose'}
      blockAlignment={'center'}
      cornerRadius={'loose'}
      overflow='hidden'
      inlineAlignment={'center'}
    >
      <Grid columns={['4%', 'auto']} inlineAlignment={'center'} padding={'base'}>
        <Text >
          <Image source={'https://static.wixstatic.com/media/963c7d_726dfc69f274458597c1852fa002357b~mv2.gif'} fit={'contain'} />
        </Text>
        <Text >{text}</Text>
      </Grid>
    </BlockLayout>
  );
}