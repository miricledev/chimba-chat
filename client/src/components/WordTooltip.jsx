import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

const WordTooltip = ({ word, translation, showTranslations }) => {
  if (!translation) {
    return <span className="inline-block mr-1">{word}</span>;
  }

  return (
    <Popover className="relative inline-block">
      {({ open }) => (
        <>
          <Popover.Button
            className={`inline-block mr-1 ${
              showTranslations ? 'underline decoration-dotted' : ''
            }`}
          >
            {word}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-48 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white p-4">
                  <p className="text-sm text-gray-900">{translation}</p>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default WordTooltip; 