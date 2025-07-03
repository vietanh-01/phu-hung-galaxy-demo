'use server';

import prisma from '../db';
import { HomepageContent } from '../types';

// Get a specific content block
export async function getContentBlock(blockType: string, identifier: string) {
  return prisma.contentBlock.findUnique({
    where: {
      blockType_identifier: {
        blockType,
        identifier
      }
    }
  });
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const blocks = await prisma.contentBlock.findMany({
    where: {
      OR: [
        { blockType: 'hero', identifier: 'main' },
        { blockType: 'about', identifier: 'main' },
      ],
    },
  });

  const content: Partial<HomepageContent> = {};

  for (const block of blocks) {
    if (block.blockType === 'hero' && block.identifier === 'main') {
      content.hero_main_title = block.title ?? '';
      content.hero_main_subtitle = block.subtitle ?? '';
    }
    if (block.blockType === 'about' && block.identifier === 'main') {
      content.about_main_title = block.title ?? '';
      content.about_main_content = block.content ?? '';
    }
  }

  return {
    hero_main_title: content.hero_main_title ?? '',
    hero_main_subtitle: content.hero_main_subtitle ?? '',
    about_main_title: content.about_main_title ?? '',
    about_main_content: content.about_main_content ?? '',
  };
}