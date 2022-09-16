import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return (
        <div className=" mt-8 pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden items-center">
            <div className="bg-[#2A2634] px-8 py-6 flex justify-between">
                <div>
                    <strong className="text-white font-black block">Não encontrou seu duo?</strong>
                    <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
                </div>

                <Dialog.Trigger asChild>
                    <button className="py-3 px-4 text-white font-medium bg-violet-500 hover:bg-violet-600 rounded-md flex items-center gap-3">
                        <MagnifyingGlassPlus size={24} />
                        Publicar anúncio
                    </button>
                </Dialog.Trigger>
            </div>
        </div>
    );
}