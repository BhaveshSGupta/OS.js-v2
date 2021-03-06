/*!
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2016, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */
(function(Utils, API) {
  'use strict';

  /**
   * @namespace OSjs
   * @memberof OSjs.VFS.Transports
   */

  /////////////////////////////////////////////////////////////////////////////
  // API
  /////////////////////////////////////////////////////////////////////////////

  /*
   * OSjs 'dist' VFS Transport Module
   *
   * This is just a custom version of 'Internal' module
   */
  var Transport = {
    url: function(item, callback) {
      var root = window.location.pathname || '/';
      if ( root === '/' || window.location.protocol === 'file:' ) {
        root = '';
      }

      var module = OSjs.VFS.Modules[OSjs.VFS.getModuleFromPath(item.path)];
      var url = item.path.replace(module.match, root);
      callback(false, url);
    }
  };

  // Inherit non-restricted methods
  var restricted = ['write', 'copy', 'move', 'unlink', 'mkdir', 'exists', 'fileinfo', 'trash', 'untrash', 'emptyTrash', 'freeSpace'];
  var internal = OSjs.VFS.Transports.Internal.module;
  Object.keys(internal).forEach(function(n) {
    if ( restricted.indexOf(n) === -1 ) {
      Transport[n] = internal[n];
    }
  });

  /////////////////////////////////////////////////////////////////////////////
  // EXPORTS
  /////////////////////////////////////////////////////////////////////////////

  OSjs.VFS.Transports.OSjs = {
    module: Transport,
    defaults: function(opts) {
      opts.readOnly = true;
      opts.searchable = true;
    }
  };

})(OSjs.Utils, OSjs.API);
