import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImage,
} from "@site/src/components/HomepageFeatures/resusableComponents/card";
import Highlights from "../components/HomepageFeatures/resusableComponents/highlights";
import {
  Column,
  Columns,
} from "../components/HomepageFeatures/resusableComponents/column";
import Text from "../components/HomepageFeatures/resusableComponents/text";
import { Divider } from "../components/HomepageFeatures/resusableComponents/divider";
import Button from "../components/HomepageFeatures/resusableComponents/button";
import Tab from "../components/HomepageFeatures/resusableComponents/tab";

export default {
  ...MDXComponents,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImage,
  Divider,
  Column,
  Columns,
  Text,
  Button,
  Tab
};
