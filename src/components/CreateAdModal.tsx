import { useEffect, useState, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import axios from 'axios';

import { GameController, Check, CaretDown, CaretUp } from 'phosphor-react'
import { Input } from './Form/Input';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGame, setSelectedGame] = useState<string>();
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  
    useEffect(() => {
      axios('http://localhost:3333/games').then(response => setGames(response.data));
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        // Validação
        if (!data.name)
            return;

        try {
            await axios.post(`http://localhost:3333/games/${selectedGame}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hoursEnd: data.hoursEnd,
                useVoiceChannel: useVoiceChannel,
            });

            alert('Anúncio criado com sucesso!');
        }
        catch (err) {
            console.log(err);
            alert('Erro ao criar o anúncio!');
        }
    }

    return (
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[488px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-[32px] font-black">
              Publique um anúncio
            </Dialog.Title>

            <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <Select.Root
                    value={selectedGame}
                    onValueChange={setSelectedGame}
                >
                    <Select.Trigger className={`flex flex-row justify-between rounded bg-zinc-900 px-4 py-3 text-sm placeholder:text-zinc-500 ${selectedGame ? "text-white" : "text-zinc-500"}`}>
                        <Select.Value id="game" placeholder="Selecione o game que deseja jogar" />
                        <Select.Icon>
                            <CaretDown className="w-6 h-6 text-zinc-400" />
                        </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                        <Select.Content className="bg-zinc-700 text-white overflow-hidden rounded p-2 shadow-lg shadow-black">
                            <Select.ScrollUpButton className="flex items-center justify-center cursor-default">
                                <CaretUp className="w-6 h-6 text-zinc-400" />
                            </Select.ScrollUpButton>

                            <Select.Viewport>
                                {games.map(game => {
                                    return (
                                        <Select.Item
                                            key={game.id}
                                            value={game.id}
                                            className={`p-1 ${selectedGame === game.id && 'bg-violet-500'}`}
                                        >
                                            <Select.ItemText>{game.title}</Select.ItemText>
                                        </Select.Item>
                                    );
                                })}
                            </Select.Viewport>

                            <Select.ScrollDownButton className="flex items-center justify-center cursor-default">
                                <CaretDown className="w-6 h-6 text-zinc-400" />
                            </Select.ScrollDownButton>
                        </Select.Content>
                    </Select.Portal>
                </Select.Root>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" type="text" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToggleGroup.Root 
                        type="multiple"
                        className="flex gap-1"
                        value={weekDays}
                        onValueChange={setWeekDays}
                    >
                        <ToggleGroup.Item
                            value="0"
                            title="Domingo"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('0') && 'bg-violet-500'}`}
                        >
                            D
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="1"
                            title="Segunda"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('1') && 'bg-violet-500'}`}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="2"
                            title="Terça"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('2') && 'bg-violet-500'}`}
                        >
                            T
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="3"
                            title="Quarta"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('3') && 'bg-violet-500'}`}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="4"
                            title="Quinta"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('4') && 'bg-violet-500'}`}
                        >
                            Q
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="5"
                            title="Sexta"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('5') && 'bg-violet-500'}`}
                        >
                            S
                        </ToggleGroup.Item>
                        <ToggleGroup.Item
                            value="6"
                            title="Sábado"
                            className={`w-7 h-7 rounded bg-zinc-900 ${weekDays.includes('6') && 'bg-violet-500'}`}
                        >
                            S
                        </ToggleGroup.Item>
                    </ToggleGroup.Root>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hoursStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hoursStart" id="hoursStart" type="time" placeholder="De" />
                    <Input name="hoursEnd" id="hoursEnd"  type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex gap-2 text-sm">
                <Checkbox.Root
                    checked={useVoiceChannel}
                    onCheckedChange={(checkedState) => setUseVoiceChannel(checkedState === true)}
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex gap-4 justify-end">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-md bg-zinc-500 px-5 py-3 font-semibold h-12 hover:bg-zinc-600"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                
                <button
                  type="submit"
                  className="rounded-md bg-violet-500 flex items-center gap-3 px-5 py-3 font-semibold h-12 hover:bg-violet-600">
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
    );
}