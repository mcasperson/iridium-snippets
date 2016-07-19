'use babel';

import IridiumSnippetsView from './iridium-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  iridiumSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.iridiumSnippetsView = new IridiumSnippetsView(state.iridiumSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.iridiumSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'iridium-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.iridiumSnippetsView.destroy();
  },

  serialize() {
    return {
      iridiumSnippetsViewState: this.iridiumSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('IridiumSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
