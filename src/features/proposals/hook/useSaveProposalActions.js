import { useProposalStore } from "../../users/Store/adminStore.js";
 
export const useProposalActions = () => {
    const deactivateProposal = useProposalStore((state) => state.deactivateProposal);
 
    /**
     * Desactiva una propuesta (la marca como CANCELLED con soft delete)
     * @param {string} proposalId - ID de la propuesta
     */
    const handleDeactivate = async (proposalId) => {
        // PATCH /proposal/:id
        await deactivateProposal(proposalId);
    };
 
    return { handleDeactivate };
};