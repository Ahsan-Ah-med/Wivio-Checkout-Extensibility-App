import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  Grid,
  GridItem,
  Text,
  BlockStack,
  Image,
  useSettings,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const { image_url, heading, sub_heading } = useSettings();
  const { image_url1, heading1, sub_heading1 } = useSettings();
  const { heading_color, heading_size } = useSettings();
  const { sub_heading_color, sub_heading_size } = useSettings();
  const { block_spacing } = useSettings();
  const { block_padding_top, block_padding_right, block_padding_bottom, block_padding_left } = useSettings();
  return (
    <>
      <Grid columns={['50%', '50%']}>
        <GridItem id='first_grid'>
          <BlockStack inlineAlignment={'center'} padding={[
            // @ts-ignore
            { block_padding_top }, { block_padding_right }, { block_padding_bottom }, { block_padding_left }]} spacing={block_spacing}>
            <Grid columns={"10%"} inlineAlignment={'center'}>
              <Image fit={'cover'} loading='lazy'
                // @ts-ignore
                source={image_url}></Image>
            </Grid>
            <Text
              // @ts-ignore
              appearance={heading_color} emphasis='bold' size={heading_size}>{heading}</Text>
            <Text
              // @ts-ignore
              appearance={sub_heading_color} size={sub_heading_size}>{sub_heading}</Text>
          </BlockStack>
        </GridItem>

        <GridItem id='second_grid'>
          <BlockStack inlineAlignment={'center'} padding={[
            // @ts-ignore
            { block_padding_top }, { block_padding_right }, { block_padding_bottom }, { block_padding_left }]} spacing={block_spacing}>
            <Grid columns={"10%"} inlineAlignment={'center'}>
              <Image fit={'cover'} loading='lazy'
                // @ts-ignore
                source={image_url1}></Image>
            </Grid>
            <Text
              // @ts-ignore
              appearance={heading_color} emphasis='bold' size={heading_size}>{heading1}</Text>
            <Text
              // @ts-ignore
              appearance={sub_heading_color} size={sub_heading_size}>{sub_heading1}</Text>
          </BlockStack>
        </GridItem>
      </Grid>
    </>
  );
}