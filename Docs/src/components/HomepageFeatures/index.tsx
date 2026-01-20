import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './style.module.css';
import Highlights from './resusableComponents/highlights';

type FeatureItem = {
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Build with Ease',
    description: (
      <>
        <Highlights color="blue">Torus</Highlights> simplifies development with a drag-and-drop editor,
        allowing you to create and customize applications effortlessly with no extensive coding required!
      </>
    ),
  },
  {
    title: 'Seamless Data Management',
    description: (
      <>
        The Data Fabric ensures smooth data integration across multiple platforms,
        enabling real-time synchronization and efficient storage solutions.
      </>
    ),
  },
  {
    title: 'Pre-Built UI Components',
    description: (
      <>
        The UI Fabric provides a library of beautiful, ready-to-use components,
        making it easy to craft responsive and visually appealing applications.
      </>
    ),
  },
  {
    title: 'Smart Automation',
    description: (
      <>
        With Process Fabric, streamline your workflows, track app performance, and
        enhance automation with all in one place.
      </>
    ),
  },
  {
    title: 'AI-Powered Intelligence',
    description: (
      <>
        The AI Fabric brings intelligence to your apps, automating tasks and enabling
        AI-driven insights for smarter decision-making.
      </>
    ),
  },
  {
    title: 'Effortless Deployment',
    description: (
      <>
        Deploy your applications in just one click with the Continuous Deployment Fabric,
        offering flexible hosting across on-prem, cloud, and hybrid environments.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')} >
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
