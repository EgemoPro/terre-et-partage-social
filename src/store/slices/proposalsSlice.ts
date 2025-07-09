
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Proposal {
  id: string;
  fromUserId: string;
  toUserId: string;
  landId: string;
  type: 'cultivation_request' | 'land_offer';
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  message: string;
  proposedTerms: {
    sharePercentage?: number;
    rentPrice?: number;
    duration?: string;
    startDate?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ProposalsState {
  proposals: Proposal[];
  sentProposals: Proposal[];
  receivedProposals: Proposal[];
  isLoading: boolean;
}

const initialState: ProposalsState = {
  proposals: [],
  sentProposals: [],
  receivedProposals: [],
  isLoading: false,
};

const proposalsSlice = createSlice({
  name: 'proposals',
  initialState,
  reducers: {
    setProposals: (state, action: PayloadAction<Proposal[]>) => {
      state.proposals = action.payload;
    },
    setSentProposals: (state, action: PayloadAction<Proposal[]>) => {
      state.sentProposals = action.payload;
    },
    setReceivedProposals: (state, action: PayloadAction<Proposal[]>) => {
      state.receivedProposals = action.payload;
    },
    addProposal: (state, action: PayloadAction<Proposal>) => {
      state.proposals.push(action.payload);
      state.sentProposals.push(action.payload);
    },
    updateProposalStatus: (state, action: PayloadAction<{ id: string; status: Proposal['status'] }>) => {
      const { id, status } = action.payload;
      
      // Update in all arrays
      const updateProposal = (proposal: Proposal) => {
        if (proposal.id === id) {
          proposal.status = status;
          proposal.updatedAt = new Date().toISOString();
        }
      };
      
      state.proposals.forEach(updateProposal);
      state.sentProposals.forEach(updateProposal);
      state.receivedProposals.forEach(updateProposal);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setProposals,
  setSentProposals,
  setReceivedProposals,
  addProposal,
  updateProposalStatus,
  setLoading,
} = proposalsSlice.actions;

export default proposalsSlice.reducer;
