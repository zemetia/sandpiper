import type { Access, FieldAccess, PayloadRequest } from 'payload';

type Role = 'admin' | 'editor';

const hasRole = (req: PayloadRequest, role: Role): boolean =>
  Boolean(req.user && 'roles' in req.user && req.user.roles?.includes(role));

export const isAdmin: Access = ({ req }) => hasRole(req, 'admin');

export const isAdminField: FieldAccess = ({ req }) => hasRole(req, 'admin');

export const isAuthenticated: Access = ({ req }) => Boolean(req.user);

export const anyone: Access = () => true;

/** Signed-in staff see drafts; the public only sees published documents. */
export const publishedOrAuthenticated: Access = ({ req }) =>
  req.user ? true : { _status: { equals: 'published' } };

export const isAdminOrSelf: Access = ({ req }) => {
  if (hasRole(req, 'admin')) return true;
  return req.user ? { id: { equals: req.user.id } } : false;
};
