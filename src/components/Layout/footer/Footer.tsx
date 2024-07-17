'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SocialMediaLink {
  label: string;
  link: string;
  icon: JSX.Element;
}

interface Course {
  title: string;
  link: string;
}

interface CompanyLink {
  label: string;
  url: string;
}

interface LegalLink {
  label: string;
  url: string;
}

interface FooterProps {
  data: {
    companyName: string;
    address: string;
    addressLink: string;
    phoneNumbers: string[];
    weekdayHours: string;
    weekendHours: string;
    socialMediaLinks: SocialMediaLink[];
    courseCategory: string;
    courses: Course[];
    companySectionTitle: string;
    companyLinks: CompanyLink[];
    legalLinks: LegalLink[];
  };
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const pathname = usePathname();
  
  if (pathname.match(/^\/admin(\/.*)?$/)) {
    return null;
  }
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="lg:grid lg:grid-cols-5 relative border">
      <div className="relative block h-32 lg:col-span-2 lg:h-full">
        <Image
          src="/assets/bg-main.svg"
          alt="footer"
          className="absolute inset-0 h-full w-full object-contain bg-slate-300"
          fill
        />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-3xl font-medium uppercase">{data.companyName}</h2>
            <address>
              <a
                target="_blank"
                href={data.addressLink}
                rel="noopener noreferrer"
                referrerPolicy='no-referrer'
              >
                {data.address}
              </a>
            </address>
            <div className="mt-5 ">
              <span className="text-xs uppercase tracking-wide"> Call us </span>
              <div className="flex items-center gap-4">
                {data.phoneNumbers.map((number, index) => (
                  <a key={index} href={`tel:${number}`} className="block font-medium hover:opacity-75">{number}</a>
                ))}
              </div>
            </div>

            <ul className="mt-8 space-y-1 text-sm ">
              <li>{data.weekdayHours}</li>
              <li>{data.weekendHours}</li>
            </ul>

            <ul className="mt-8 flex gap-6">
              {data.socialMediaLinks.map((socialMedia, index) => (
                <li key={index}>
                  <a
                    href={socialMedia.link}
                    rel="noreferrer"
                    target="_blank"
                    className=" transition hover:opacity-75"
                  >
                    <span className="sr-only">{socialMedia.label}</span>
                    {socialMedia.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium">{data.courseCategory}</p>
              <ul className="mt-6 space-y-4 text-sm">
                {data.courses.map((course, index) => (
                  <li key={index}>
                    <Link href={course.link} className=" transition hover:opacity-75">{course.title}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium">{data.companySectionTitle}</p>
              <ul className="mt-6 space-y-4 text-sm">
                {data.companyLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.url} className=" transition hover:opacity-75">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 dark:border-gray-600 pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              {data.legalLinks.map((legalLink, index) => (
                <li key={index}>
                  <a href={legalLink.url} className="text-gray-500 transition hover:opacity-75">{legalLink.label}</a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-gray-500 sm:mt-0">&copy; {currentYear}. {data.companyName}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
