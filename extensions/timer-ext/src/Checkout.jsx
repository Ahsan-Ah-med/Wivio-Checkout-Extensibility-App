import {
  reactExtension,
  useSettings,
  BlockStack,
  View,
  Text,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState } from 'react';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

function Extension() {
  const {
    timer_before_text,
    timer_after_text,
    timer,
    timer_ends,
    timer_text_color,
    timer_text_size,
    timer_size,
    timer_color
  } = useSettings();

  const { storage } = useApi(); // useApi gives access to store data like session storage
  //@ts-ignore
  const [counterTimer, setCounterTimer] = useState(timer * 60); // Initial timer value set to the value from useSettings()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTimer = await storage.read('countdownTimer');
        if (storedTimer !== null) {
          //@ts-ignore
          setCounterTimer(storedTimer);
        }
      } catch (error) {
        console.error('Error while reading timer data:', error);
      }
    };

    fetchData();
  }, [storage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounterTimer((prevTimer) => {
        if (prevTimer > 0) {
          const newTimer = prevTimer - 1;
          storage
            .write('countdownTimer', newTimer)
            .catch((error) => console.error('Error while writing timer data:', error));
          return newTimer;
        } else {
          clearInterval(interval);
          storage
            .delete('countdownTimer')
            .catch((error) => console.error('Error while deleting timer data:', error));
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [storage]);

  const formattedTime = formatTime(counterTimer);
  return (
    <BlockStack
      border="base"
      borderRadius="base"
      padding="tight"
      spacing="loose"
      cornerRadius="loose"
      overflow="hidden"
      inlineAlignment="center"
    >
      <View>{
          //@ts-ignore
          <Text size={timer_text_size} appearance={timer_text_color} emphasis="strong">
            {timer_before_text}
          </Text>
        }
          {counterTimer > 0 ? (
            //@ts-ignore
            <Text size={timer_size} emphasis="strong" appearance={timer_color}>
              {formattedTime}
            </Text>
          ) : (
            //@ts-ignore
            <Text size={timer_size} appearance={timer_color} emphasis="strong">
              {timer_ends}
            </Text>
          )}
          {
            //@ts-ignore
            <Text size={timer_text_size} appearance={timer_text_color} emphasis="strong">
              {timer_after_text}
            </Text>
   
      }
      </View>
    </BlockStack>
  );
}