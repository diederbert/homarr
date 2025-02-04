import { Center, Flex, Group, HoverCard, RingProgress, Text } from '@mantine/core';
import { IconServer } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { humanFileSize } from '~/tools/humanFileSize';

import { ringColor } from './HealthMonitoringTile';

const HealthMonitoringFileSystem = ({ fileSystem }: any) => {
  const { t } = useTranslation('modules/health-monitoring');

  interface FileSystemDisk {
    devicename: string;
    used: string;
    percentage: number;
    available: number;
  }

  return (
    <Group position="center">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap={{ base: 'sm', sm: 'lg' }}
        justify={{ sm: 'center' }}
      >
        {fileSystem.map((disk: FileSystemDisk) => (
          <RingProgress
            size={140}
            roundCaps
            thickness={12}
            label={
              <Center style={{ flexDirection: 'column' }}>
                {disk.devicename}
                <HoverCard width={280} shadow="md" position="top">
                  <HoverCard.Target>
                    <IconServer size={40} />
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text fz="lg" tt="uppercase" fw={700} c="dimmed" align="center">
                      {t('fileSystem.available', {
                        available: humanFileSize(disk.available),
                        percentage: 100 - disk.percentage,
                      })}
                    </Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Center>
            }
            sections={[
              {
                value: disk.percentage,
                color: ringColor(disk.percentage),
                tooltip: disk.used,
              },
            ]}
          />
        ))}
      </Flex>
    </Group>
  );
};

export default HealthMonitoringFileSystem;
