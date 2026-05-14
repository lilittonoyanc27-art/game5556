/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppScreen = 'menu' | 'vocab' | 'game';

export interface BeachVocab {
  spanish: string;
  armenian: string;
}

export interface BeachExample {
  spanish: string;
  armenian: string;
}

export interface BeachDialogue {
  speaker: string;
  text: string;
  translation: string;
}
