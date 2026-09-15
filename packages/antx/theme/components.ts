import type { ComponentToken as AttachmentsToken } from '../attachments/style';
import type { ComponentToken as SenderComponentToken } from '../sender/style';
import type { ComponentToken as TransitionCollapseComponentToken } from '../transition-collapse/style';

export interface ComponentTokenMap {
  TransitionCollapse?: TransitionCollapseComponentToken;
  Attachments?: AttachmentsToken;
  Sender?: SenderComponentToken;
}
