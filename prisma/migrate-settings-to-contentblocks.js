const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateSettingsToContentBlocks() {
  console.log('Starting migration from Settings to ContentBlocks...');

  try {
    // Get all existing settings
    const settings = await prisma.setting.findMany();
    console.log(`Found ${settings.length} settings to migrate`);

    // Mapping existing settings to content block structure
    const contentBlockMappings = [
      {
        key: 'heroTitle',
        blockType: 'hero',
        identifier: 'main',
        field: 'title'
      },
      {
        key: 'heroSubtitle',
        blockType: 'hero',
        identifier: 'main',
        field: 'subtitle'
      },
      {
        key: 'aboutUsContent',
        blockType: 'about',
        identifier: 'main',
        field: 'content'
      }
    ];

    // Group settings by content block
    const contentBlocks = new Map();

    for (const setting of settings) {
      const mapping = contentBlockMappings.find(m => m.key === setting.key);
      
      if (mapping) {
        const blockKey = `${mapping.blockType}-${mapping.identifier}`;
        
        if (!contentBlocks.has(blockKey)) {
          contentBlocks.set(blockKey, {
            blockType: mapping.blockType,
            identifier: mapping.identifier,
            title: null,
            content: null,
            subtitle: null,
            isActive: true,
            order: 0
          });
        }
        
        const block = contentBlocks.get(blockKey);
        block[mapping.field] = setting.value;
      } else {
        // For unmapped settings, create individual blocks
        console.log(`Creating individual block for unmapped setting: ${setting.key}`);
        contentBlocks.set(`custom-${setting.key}`, {
          blockType: 'custom',
          identifier: setting.key,
          title: setting.key,
          content: setting.value,
          subtitle: null,
          isActive: true,
          order: 999
        });
      }
    }

    // Create content blocks
    for (const [blockKey, blockData] of contentBlocks) {
      console.log(`Creating content block: ${blockKey}`);
      
      await prisma.contentBlock.upsert({
        where: {
          blockType_identifier: {
            blockType: blockData.blockType,
            identifier: blockData.identifier
          }
        },
        update: blockData,
        create: blockData
      });
    }

    console.log(`Migration completed! Created ${contentBlocks.size} content blocks.`);
    
    // Optionally, verify the migration
    const createdBlocks = await prisma.contentBlock.findMany();
    console.log(`Verification: ${createdBlocks.length} content blocks exist in database.`);

  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
if (require.main === module) {
  migrateSettingsToContentBlocks()
    .then(() => {
      console.log('Migration script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = migrateSettingsToContentBlocks; 