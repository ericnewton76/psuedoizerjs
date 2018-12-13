/**
 * Provides CLIs with a way to smartly output information as they do processing.
 */
class Status {
  
  constructor(quiet) {
    if(quiet) {
      this._quiet = true; 
    } else {
      this._quiet = false;
    }
  }
  
  /**
   * Logs output to console when quite is false
   * @param {args} arguments to console.log
   */
  log() {
    if(this._quiet === false) {
      console.log.apply(arguments);
    }
  }

   /**
   * Logs output to console.warn 
   * @param {args} arguments to console.warn
   */
  warn() {
    console.warn.apply(arguments);
  }

  /**
   * Sets the Quiet flag, which suppresses any console.log output
   * @param {bool} quiet 
   */
  setQuiet(quiet) {
    this._quiet = quiet || false;
  }

  /**
   * Sets the Verbose flag, which will output status.verbose to stdout
   * @param {bool} verbose 
   */
  setVerbose(verbose) {
    this._verbose = verbose || false;
  }

  /**
   * Takes the options passed in and will set Quiet and Verbose flags if these properties found on the object.
   * @param {object} options 
   */
  setOptions(options) {
    options = options || {};
    if(options.quiet) {
      this._quiet = options.quiet || false;
    }
    if(options.verbose) {
      this._verbose = options.verbose || false;
    }
  }
  
}

module.exports = new Status();