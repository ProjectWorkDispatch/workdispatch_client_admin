import { useProposalStore } from "../../users/Store/adminStore.js";

export const useProposalActions = () => {
    const deactivateProposal = useProposalStore((state) => state.deactivateProposal);

    const handleDeactivate = async (proposalId, onSuccess) => {
        const ok = await deactivateProposal(proposalId);
        if (ok) onSuccess?.();
    };

    return { handleDeactivate };
};