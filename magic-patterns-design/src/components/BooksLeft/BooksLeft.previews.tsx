import { BooksLeft } from './index';
import type { ComponentPreviewModule } from '../previewTypes';

const previews: ComponentPreviewModule = {
  componentName: 'BooksLeft',
  importPath: 'components/BooksLeft',
  previews: [
  {
    name: 'Default',
    description: 'Warm 4-book pixel stack',
    render: () => <BooksLeft label="Stack of books" />
  },
  {
    name: 'With mug',
    description: 'Stack topped with a coffee mug',
    render: () => <BooksLeft withMug pixelSize={5} label="Books with a mug" />
  },
  {
    name: 'On desk',
    description: 'Placed at the left edge of a desk surface',
    render: () =>
    <div className="w-80 bg-[#2a2320] p-4">
          <div className="flex items-end">
            <BooksLeft pixelSize={3} />
          </div>
          <div className="h-3 w-full bg-[#8a5a3b]" />
          <div className="h-1 w-full bg-[#5c3b26]" />
        </div>

  },
  {
    name: 'Custom books',
    description: 'Two custom-colored books',
    render: () =>
    <BooksLeft
      pixelSize={6}
      books={[
      { color: '#6d4c9f', shade: '#432e63', length: 16, thickness: 5 },
      { color: '#2f8f8a', shade: '#1c5653', length: 13, thickness: 3, offset: 2 }]
      } />


  }]

};

export default previews;