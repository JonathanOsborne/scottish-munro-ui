import React from 'react';
import Link from 'next/link';
import { Menu } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { randomMunroSelector } from '@/store/munroSlice';

export enum MunroAPIPageType {
  HOME,
  MUNRO_CONTENT,
  MUNRO_SEARCH,
}

interface MenuBarProps {
  page: MunroAPIPageType;
  randomMunro?: string;
}

export const MenuBar = ({ page, randomMunro }: MenuBarProps) => {
  const router = useRouter();
  const munro = useSelector(randomMunroSelector);

  const handleFeelingLuckyClick = React.useCallback(async () => {
    router.push(`/munros/${munro}`);
  }, [router, munro]);

  return (
    <Menu inverted attached>
      <Link href="/" passHref>
        <Menu.Item
          name="home"
          content="Home"
          active={page === MunroAPIPageType.HOME}
        />
      </Link>
      {page === MunroAPIPageType.MUNRO_CONTENT && (
        <Link href={`/munros/${randomMunro}`} passHref>
          <Menu.Item name="lucky" content="Feeling Lucky" position="right" />
        </Link>
      )}
      {page === MunroAPIPageType.HOME && (
        <Menu.Item
          name="lucky"
          content="Feeling Lucky"
          position="right"
          onClick={handleFeelingLuckyClick}
        />
      )}
    </Menu>
  );
};
