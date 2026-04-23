import type { ReactNode } from 'react';
import type { PortableTextBlock } from '@portabletext/types';
import type { PortableTextComponents } from 'next-sanity';
import { getPortableTextSubheadingId } from '@/entities/legal-document/model/legal-toc.lib';

type LinkValue = {
  href?: string;
};

type ListItemProps = {
  children?: ReactNode;
};

function toPlainText(block: PortableTextBlock | undefined) {
  return (block?.children ?? [])
    .map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ''))
    .join('')
    .trim();
}

export function createLegalPortableTextComponents(sectionKey: string): PortableTextComponents {
  return {
    marks: {
      link: ({ children, value }) => {
        const typedValue = value as LinkValue | undefined;
        const href = typeof typedValue?.href === 'string' ? typedValue.href : '#';
        const external = href.startsWith('http') || href.startsWith('mailto:');

        return (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="font-normal text-[#e50914] underline underline-offset-2 transition-colors hover:text-[#b20710]"
          >
            {children}
          </a>
        );
      },
    },
    block: {
      normal: ({ children }) => (
        <p className="m-0 text-[16px] leading-6 text-[#333333]">{children}</p>
      ),
      h3: (props) => {
        const title = toPlainText(props.value);
        const id = title ? getPortableTextSubheadingId(sectionKey, title) : undefined;

        return (
          <h3
            id={id}
            className="scroll-mt-[calc(var(--header-total-offset)+1.5rem)] text-[18px] font-bold leading-[27px] text-[#221f1f]"
          >
            {props.children}
          </h3>
        );
      },
      h4: ({ children }) => (
        <h4 className="text-[16px] font-bold leading-6 text-[#221f1f]">{children}</h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#d5d4d1] pl-3 text-[14px] leading-[21px] text-[#221f1f]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="my-0 list-disc space-y-2 pl-8">{children}</ul>,
      number: ({ children }) => <ol className="my-0 list-decimal space-y-2 pl-8">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: ListItemProps) => (
        <li className="pl-1 text-[16px] leading-6 text-[#333333] [&>p]:inline">{children}</li>
      ),
      number: ({ children }: ListItemProps) => (
        <li className="pl-1 text-[16px] leading-6 text-[#333333] [&>p]:inline">{children}</li>
      ),
    },
  };
}
