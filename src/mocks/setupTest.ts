import { beforeAll, afterEach, afterAll } from 'vitest';
import { mockServer } from './mockServer';

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
