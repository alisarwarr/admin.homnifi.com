import { Accordion, AccordionItem } from '@nextui-org/react';
import React from 'react';

type Props = {
  children: any;
  headingClassName?: string;
  containerClassName?: string;
  baseClassName?: string;
  contentClassName?: string;
  parentContainerClassName?: string;
  selectionMode?: 'single' | 'multiple' | 'none';
};

const GlobalAccordian = ({
  children,
  headingClassName,
  selectionMode,
  containerClassName,
  baseClassName,
  contentClassName,
  parentContainerClassName,
}: Props) => {
  return (
    <section className={`col-span-2 w-full ${parentContainerClassName}`}>
      <Accordion
        selectionMode={selectionMode}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              height: 'auto',
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 1,
                },
                opacity: {
                  easings: 'ease',
                  duration: 1,
                },
              },
            },
            exit: {
              y: -10,
              opacity: 0,
              height: 0,
              transition: {
                height: {
                  easings: 'ease',
                  duration: 0.25,
                },
                opacity: {
                  easings: 'ease',
                  duration: 0.3,
                },
              },
            },
          },
        }}
        variant="shadow"
        className={`col-span-2 w-full px-0 ${containerClassName}`}
        itemClasses={{
          base: `col-span-2 w-full ${baseClassName}`,
          heading: headingClassName || 'bg-red-200',
          content: `col-span-2 w-full px-0 ${contentClassName}`,
        }}
      >
        {React.Children.map(children, (child) => {
          if (child.type === AccordionItem) {
            return child;
          }
          return <div className="non-collapsible">{child}</div>;
        })}
      </Accordion>
    </section>
  );
};

export default GlobalAccordian;
